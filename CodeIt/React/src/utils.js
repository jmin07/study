/* 1에서부터 n사이의 랜덤한 정수를 리턴한다. */
export function getRandomNumber(n) {
    return Math.floor(Math.random() * n + 1);
}
