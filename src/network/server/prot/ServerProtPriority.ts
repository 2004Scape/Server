// these priorities are important for cases where the content developer wants to be aware of the
// bandwidth implications their script may run into and how it impacts the player experience
enum ServerProtPriority {
    // counted as part of the buffer_full command
    // alternate names: LOW, CONTENT
    BUFFERED,

    // not counted as part of the buffer_full command
    // alternate names: HIGH, ESSENTIAL, ENGINE
    IMMEDIATE
}

export default ServerProtPriority;
