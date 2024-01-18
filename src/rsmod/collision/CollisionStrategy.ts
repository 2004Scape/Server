interface CollisionStrategy {
    canMove(tileFlag: number, blockFlag: number): boolean;
}

export default CollisionStrategy;
