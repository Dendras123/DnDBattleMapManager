import {
  ActionType,
  actionTypes,
  actionTypesAndIcons,
} from '../types/actionType';
import ToolbarIcon from './ToolbarIcon';

interface ToolbarProps {
  selectedAction: ActionType;
  setSelectedAction: React.Dispatch<React.SetStateAction<ActionType>>;
}

export default function Toolbar({
  selectedAction,
  setSelectedAction,
}: ToolbarProps) {
  const handleSelect = (action: ActionType) => {
    setSelectedAction(action);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '20px',
      }}
    >
      {actionTypes.map((type) => (
        <ToolbarIcon
          key={type}
          isSelected={selectedAction === type}
          onClick={() => handleSelect(type)}
          CircleIcon={actionTypesAndIcons[type]}
        />
      ))}
    </div>
  );
}
