import produce from 'immer';
import { A, O } from '@mobily/ts-belt';

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
    return produce(anteState, draftState => {
        draftState.gifts.push({ id: giftId, description, image, reservedBy: undefined })
    });
}

export function toggleReservation(anteState: State, giftId: GiftId): State {
    const reserveGift = (gift: Gift) => {
        switch(true) {
            case gift.reservedBy === undefined:
                return anteState.currentUser.id
            case gift.reservedBy === anteState.currentUser.id:
                return undefined
            default:
                return gift.reservedBy;
        }
    }

    return produce(anteState, draftState => {
        const maybeGift = A.find(draftState.gifts, g => g.id === giftId);
        O.map(maybeGift, g => {
            g.reservedBy = reserveGift(g);
            return g;
        });
    });
}
