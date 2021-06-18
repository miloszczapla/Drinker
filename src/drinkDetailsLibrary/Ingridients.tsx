import { useEffect, useState } from 'react';

interface Props {
  ingridients: string[];
  mesure: string[];
}

interface Content {
  left: string;
  right: string;
}

const Ingridients = ({ ingridients, mesure }: Props) => {
  const [content, setContent] = useState<Content>({
    left: '',
    right: '',
  });

  useEffect(() => {
    setContent({ left: '', right: '' });

    ingridients.forEach((ingri, index) => {
      if (!mesure[index] && !ingri) return;
      index % 2 === 0
        ? setContent((oldcontent) => {
            return {
              ...oldcontent,
              left: oldcontent.left + `${mesure[index] || ''} ${ingri || ''}\n`,
            };
          })
        : setContent((oldcontent) => {
            return {
              ...oldcontent,
              right:
                oldcontent.right + `${mesure[index] || ''} ${ingri || ''}\n`,
            };
          });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesure]);

  return (
    <div className='ingridient'>
      <h2>You will need:</h2>
      <div className='ingridient-content'>
        <div className='ingridient-content-left'>{content.left.trim()}</div>
        <div className='ingridient-content-right'>{content.right.trim()}</div>
      </div>
    </div>
  );
};

export default Ingridients;
