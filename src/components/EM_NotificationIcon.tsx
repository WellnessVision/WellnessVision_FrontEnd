import React from 'react';
import { Badge } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface NotificationIconProps {
  count: number;
}

const EM_NotificationIcon: React.FC<NotificationIconProps> = ({ count }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block',  left: '300px', top: '5px'}}>
      <a href='#'>
      <i className="bi bi-bell" style={{ fontSize: '24px' }}></i>
      </a>
      {count > 0 && (
        <Badge
          pill
          bg="danger"
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-10px',
          }}
        >
          {count}
        </Badge>
      )}
    </div>
  );
};

export default EM_NotificationIcon;
