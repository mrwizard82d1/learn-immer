import { A, F } from '@mobily/ts-belt';

type UserId = number;
type UserName = string;
type User = { id: UserId, name: UserName };
type GiftId = string;
type Description = string;
type Image = string;
type ReservedBy = number | undefined;
export type Gift = { id: GiftId, description: Description, image: Image, reservedBy: ReservedBy };
export type State = { users: User[], currentUser: User, gifts: Gift[] };

export function addGift(anteState: State, giftId: GiftId, description: Description, image: Image): State {
    const postState = {
        ...anteState,
        gifts: [
            ...anteState.gifts,
            { id: giftId, description, image, reservedBy: undefined },
        ],
    };

    return postState;
}

export function toggleReservation(anteState: State, giftId: GiftId): State {
    const reserveGift = (gift: Gift) => {
        switch(true) {
            case gift.reservedBy == undefined:
                return {
                    ...gift,
                    reservedBy: anteState.currentUser.id,
                }
            case gift.reservedBy == anteState.currentUser.id:
                return {
                    ...gift,
                    reservedBy: undefined
                }
            default:
                return gift
        }
    }
    const postState = {
        ...anteState,
        gifts: F.toMutable(A.map<Gift, Gift>(anteState.gifts, g => (g.id === giftId
                                                                    ? reserveGift(g)
                                                                    : g))),
    };
    return postState;
}
