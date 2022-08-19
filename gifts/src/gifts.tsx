import { A, O, pipe } from '@mobily/ts-belt';

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
    const nextState = {
        ...anteState,
        gifts: [ ...anteState.gifts ],
    };
    nextState.gifts.push({ id: giftId, description, image, reservedBy: undefined });

    return nextState;
}
