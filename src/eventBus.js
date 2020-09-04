// this is the event bus, it is simply a vue app instance that doesn't do anything on it's own, but can be imported into different files. Once imported it can be instructed to emit an event, or it can be listened too for events. This way we have a globally available nexus for emitting and listening for events, sort of like a radio tower
import Vue from "vue";
const EventBus = new Vue();
export default EventBus;
