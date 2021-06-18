interface Props {
  stepContent: string;
}

const Step = ({ stepContent }: Props) => {
  return <h3 className='details-step'>{stepContent}</h3>;
};

export default Step;
