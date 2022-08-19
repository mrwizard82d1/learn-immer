import { State, addGift, toggleReservation } from './gifts';

const initialState: State = {
    users: [
        {
            id: 1,
            name: 'Test user',
        },
        {
            id: 2,
            name: 'Someone else',
        },
    ],
    currentUser: {
        id: 1,
        name: 'Test user',
    },
    gifts: [
        {
            id: "immer_license",
            description: "Immer license",
            image: "https://raw.githubusercontent.com/immerjs/immer/master/images/immer-logo.png",
            reservedBy: 2
        },
        {
            id: 'egghead_subscription',
            description: "Egghead.io subscription",
            image: "https://pbs.twimg.com/profile_images/735242324293210112/H8YfgQHP_400x400.jpg",
            reservedBy: undefined
        },
    ],
};

test('pass a canary test', () => {
    expect(2 + 2).toEqual(4);
})

describe('adding a gift', () => {
    const nextState = addGift(initialState, 'mug', 'Coffee Mug', 'image');

    test('adds a gift to the collection', () => {
        expect(nextState.gifts.length).toEqual(3);
    });

    test('did not modify the original state', () => {
        expect(initialState.gifts.length).toEqual(2);
    });
})

describe('reserving a gift', () => {
    test('preserves stored reservedBy', () => {
        const nextState = toggleReservation(initialState, 'immer_license');
        expect(nextState.gifts[0].reservedBy).toBe(2);
    })

    test('do nothing if already reserved by someone else', () => {
        const nextState = toggleReservation(initialState, 'immer_license');
        expect(nextState.gifts[0].reservedBy).toBe(2);
    })

    test('toggle reserved on if not reserved', () => {
        const nextState = toggleReservation(initialState, 'egghead_subscription');
        expect(nextState.gifts[1].reservedBy).toBe(1);
    })

    test('toggle reserved off if reserved', () => {
        const subsequentState = toggleReservation(initialState, 'egghead_subscription');
        const nextState = toggleReservation(subsequentState, 'egghead_subscription');
        expect(nextState.gifts[1].reservedBy).toBe(undefined);
    })
})
