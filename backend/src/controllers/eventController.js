import Event from '../models/eventModel.js';

// get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// get single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: event });
  } 
  
  
  catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// create new event
export const createEvent = async (req, res) => {
  try {
   
    const event = new Event(req.body);
   
   
    await event.save();
    res.status(201).json({ success: true, message: 'Event created successfully', data: event });
  } 
  
  catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {


      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, message: 'Event updated successfully', data: event });
  } 
  
  
  catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);


    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, message: 'Event deleted successfully' });
  } 
  catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 