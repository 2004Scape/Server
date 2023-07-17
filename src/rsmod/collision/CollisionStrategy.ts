export default interface CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean;
}
