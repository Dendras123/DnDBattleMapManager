import {
  ActionType,
  actionTypes,
  actionTypesAndIcons,
} from '../types/actionType';
import ToolbarIcon from './ToolbarIcon';
import ToolbarIconDiceRoller from './ToolbarIconDiceRoller';
import ToolbarIconColorPicker from './ToolbarIconColorPicker';

interface ToolbarProps {
  selectedAction: ActionType;
  setSelectedAction: React.Dispatch<React.SetStateAction<ActionType>>;
  setDrawingColor: React.Dispatch<React.SetStateAction<string>>;
  height: number;
}

export default function Toolbar({
  selectedAction,
  setSelectedAction,
  setDrawingColor,
  height,
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
        height: height,
        zIndex: 1,
      }}
    >
      {actionTypes.map((type) => {
        switch (type) {
          case 'draw':
            return (
              <ToolbarIconColorPicker
                key={type}
                isSelected={selectedAction === type}
                onClick={() => handleSelect(type)}
                CircleIcon={actionTypesAndIcons[type]}
                setDrawingColor={setDrawingColor}
              />
            );
          case 'rollDice':
            return (
              <ToolbarIconDiceRoller
                key={type}
                isSelected={selectedAction === type}
                onClick={() => handleSelect(type)}
                CircleIcon={actionTypesAndIcons[type]}
              />
            );
          default:
            return (
              <ToolbarIcon
                key={type}
                isSelected={selectedAction === type}
                onClick={() => handleSelect(type)}
                CircleIcon={actionTypesAndIcons[type]}
              />
            );
        }
      })}
    </div>
  );
}
