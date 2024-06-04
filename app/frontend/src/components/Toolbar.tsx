import {
  ActionType,
  actionTypes,
  actionTypesAndIcons,
} from '../types/actionType';
import ToolbarIcon from './ToolbarIcon';
import ToolbarIconColorPicker from './ToolbarIconColorPicker';

interface ToolbarProps {
  selectedAction: ActionType;
  setSelectedAction: React.Dispatch<React.SetStateAction<ActionType>>;
  setDrawingColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function Toolbar({
  selectedAction,
  setSelectedAction,
  setDrawingColor,
}: ToolbarProps) {
  const handleSelect = (action: ActionType) => {
    setSelectedAction(action);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '20px',
        marginLeft: '10px',
        height: '750px',
      }}
    >
      {actionTypes.map((type) => {
        return type === 'draw' ? (
          <ToolbarIconColorPicker
            key={type}
            isSelected={selectedAction === type}
            onClick={() => handleSelect(type)}
            CircleIcon={actionTypesAndIcons[type]}
            setDrawingColor={setDrawingColor}
          />
        ) : (
          <ToolbarIcon
            key={type}
            isSelected={selectedAction === type}
            onClick={() => handleSelect(type)}
            CircleIcon={actionTypesAndIcons[type]}
          />
        );
      })}
    </div>
  );
}
