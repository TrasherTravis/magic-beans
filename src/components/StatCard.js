import { Card } from 'react-bootstrap';

export const StatCard = ({ heading, list, titleStyle, isLast }) => {
  return (
    <Card className={!isLast && 'mb-4'}>
      <Card.Header className='text-center py-1'>{heading}</Card.Header>
      <Card.Body>
        {list.map((content, idx) => {
          return (
            <div key={`content-${idx}`}>
              <Card.Title className={titleStyle}>{content.title}</Card.Title>
              {content.text && (
                <Card.Text className='small'>{content.text}</Card.Text>
              )}
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
};
