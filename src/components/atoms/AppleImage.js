import Image from 'next/image';

export default function AppleImage() {
  return (
    <Image
      src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
      alt="Apple"
      width={80}
      height={80}
      style={{
        objectFit: 'contain',
        filter: 'drop-shadow(0 0 8px #fff2)',
      }}
      unoptimized
    />
  );
}