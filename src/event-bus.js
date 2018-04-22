import EventBus from 'eventbusjs';

EventBus.on = EventBus.addEventListener.bind(EventBus);
EventBus.off = EventBus.removeEventListener.bind(EventBus);

export default EventBus;
export const dispatch = EventBus.dispatch.bind(EventBus);
export const onEvent = EventBus.on.bind(EventBus);
export const offEvent = EventBus.off.bind(EventBus);
