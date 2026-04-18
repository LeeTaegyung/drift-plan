const adjectives = [
  '용감한',
  '예쁜',
  '아름다운',
  '낭만있는',
  '설레는',
  '자유로운',
  '따뜻한',
  '빛나는',
  '고요한',
  '신나는',
  '느긋한',
  '유쾌한',
  '다정한',
  '씩씩한',
  '반짝이는',
];

export const getRandomNickname = () => {
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNum = Math.floor(Math.random() * 9000 + 100000);
  return `${randomAdj}_여행자_${randomNum}`;
};
