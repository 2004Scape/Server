export default [
    {
        id: 10,
        region: process.env.REGION || 'Docker Test #1',
        address: `http://localhost:${process.env.WORLD_REDIRECT || 80}`,
        members: process.env.MEMBERS_WORLD === 'true',
        portOffset: 0
    },
    {
        id: 11,
        region: process.env.REGION || 'Another Region #2',
        address: `http://localhost:${process.env.WORLD_REDIRECT || 80}`,
        members: process.env.MEMBERS_WORLD === 'true',
        portOffset: 0
    }
];
