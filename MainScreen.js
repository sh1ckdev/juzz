import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterButton from './FooterButton';
import IconButton from './IconButton';

const MainScreen = ({ navigation }) => {
  // Состояние для отображения/скрытия модального окна
  const [isModalVisible, setModalVisible] = useState(false);
  // Состояние для хранения событий
  const [events, setEvents] = useState([]);
  // Ref для ScrollView
  const scrollViewRef = useRef();

  useEffect(() => {
    loadEvents();
  }, []);

  // Загрузка событий из хранилища
  const loadEvents = async () => {
    try {
      const savedEvents = await AsyncStorage.getItem('events');
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    } catch (error) {
      console.error('Ошибка загрузки событий', error);
    }
  };

  // Сохранение событий в хранилище
  const saveEvents = async (eventsToSave) => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(eventsToSave));
    } catch (error) {
      console.error('Ошибка сохранения событий', error);
    }
  };

  // Переключение видимости модального окна
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Если scrollViewRef не передан, выдаем ошибку и возвращаем null
  if (!scrollViewRef) {
    console.error('Не передан scrollViewRef в FooterButton');
    return null;
  }
  // Обработчик создания нового события
  const handleCreateEvent = (eventName, eventDate, eventLocation, eventDescription, eventImage) => {
    const newEvent = {
      eventName,
      eventDate,
      eventLocation,
      eventDescription,
      eventImage,
    };
  
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);

    toggleModal();
  
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  // Обработчик удаления события
  const handleDeleteEvent = (eventDate) => {
    const updatedEvents = events.filter((event) => event.eventDate !== eventDate);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

// Отрисовка компонента
  return (
    <View style={styles.container}>
      {/* ScrollView для отображения списка событий */}
      <ScrollView ref={scrollViewRef} style={styles.eventContainer}>
        {/* Отображение каждого события с помощью EventBlock */}
        {events.map((event) => (
          <EventBlock key={event.eventDate} {...event} onDelete={() => handleDeleteEvent(event.eventDate)} />
        ))}
      </ScrollView>

      {/* Кнопка для открытия модального окна создания события */}
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      {/* Компонент FooterButton для прокрутки ScrollView вверх */}
      <FooterButton scrollViewRef={scrollViewRef} />

      {/* Модальное окно создания события */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <CreateEventModal onCancel={toggleModal} onCreateEvent={handleCreateEvent} />
      </Modal>
    </View>
  );
};

const CreateEventModal = ({ onCancel, onCreateEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState('');

  const handleCreateEventPress = () => {
    if (!eventName || !eventDate || !eventLocation || !eventDescription || !eventImage) {
      alert('Заполните все поля');
      return;
    }

    onCreateEvent(eventName, eventDate, eventLocation, eventDescription, eventImage);
  };
  

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Создание мероприятия</Text>

        <TextInput
          style={styles.input}
          placeholder="Название мероприятия"
          value={eventName}
          onChangeText={(text) => setEventName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Дата мероприятия"
          value={eventDate}
          onChangeText={(text) => setEventDate(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Место проведения"
          value={eventLocation}
          onChangeText={(text) => setEventLocation(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Описание мероприятия"
          value={eventDescription}
          onChangeText={(text) => setEventDescription(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Ссылка на изображение"
          value={eventImage}
          onChangeText={(text) => setEventImage(text)}
        />

        <View style={styles.buttonsContainer}>
          <Button title="Отмена" onPress={onCancel} style />
          <Button title="Создать" onPress={handleCreateEventPress} />
        </View>
      </View>
    </View>
  );
};

const trashIcon = require('./assets/trashIcon.png');

const EventBlock = ({ eventName, eventDate, eventLocation, eventDescription, eventImage, onDelete, onRegister }) => {
  return (
    <View style={styles.eventBlock}>
      {/* Компонент IconButton для удаления события */}
      <IconButton onPress={onDelete} icon={trashIcon} />

      {/* Информация о событии */}
      <Text style={styles.eventName}>{eventName}</Text>
      <Image source={{ uri: eventImage }} style={styles.eventImage} resizeMode="cover" />
      <Text style={styles.eventInfo}>{`Дата: ${eventDate}`}</Text>
      <Text style={styles.eventInfo}>{`Место: ${eventLocation}`}</Text>
      <Text style={styles.eventDescription}>{eventDescription}</Text>
      
      {/* Кнопка "Записаться" */}
      <TouchableOpacity style={styles.registrationButton} onPress={onRegister}>
        <Text style={styles.registrationButtonText}>Записаться</Text>
      </TouchableOpacity>

      {/* Кнопка удаления */}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#3d3d3d',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 18,
  },
  registrationButton: {
    position: 'relative',
    bottom: 105,
    right: -230,
    backgroundColor: '#3d3d3d',
    borderRadius: 5,
    width: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  registrationButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'regular',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 105,
    right: 5,
    backgroundColor: '#3d3d3d',
    borderRadius: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  deleteButtonText: {
    bottom: -10,
    top: -3,
    left: 0,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
 addButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'white',
  borderRadius: 10,
  width: 40,
  height: 40,
  borderWidth: 4,
  borderColor: '#3d3d3d',
},
  buttonText: {
    bottom: -20,
    top: -8,
    left: 2,
    color: '#3d3d3d',
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  eventBlock: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderTopColor: 'white',
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: 250,
    marginBottom: 8,
  },
  eventName: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventInfo: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  eventDescription: {
      marginLeft: 10,
      fontSize: 16,
      marginBottom: 7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
});

export default MainScreen;
