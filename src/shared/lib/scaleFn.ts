export const scaleFn = (id: number) => {
    switch (id) {
        case 1:
            return 1.06;
        case 2:
            return .88;
        case 3:
            return .9;
        default:
            return 1;
    }
}