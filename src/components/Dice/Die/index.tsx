import {
  TbDice1,
  TbDice2,
  TbDice3,
  TbDice4,
  TbDice5,
  TbDice6,
} from 'react-icons/tb';

const FACES = [
  TbDice1,
  TbDice2,
  TbDice3,
  TbDice4,
  TbDice5,
  TbDice6,
];

interface Props {
  // From 1 to 6
  readonly value: number;
  readonly label: string;
  readonly color?: string;
  readonly className?: string;
}

function Die({
  value,
  label,
  color,
  className,
}: Props) {
  const Face = FACES[value - 1];

  return (
    <Face
      aria-label={label}
      className={className}
      color={color}
      role="img" />
  );
}

export default Die;
