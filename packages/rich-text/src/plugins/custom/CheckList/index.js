import React from 'react';
import ToolbarIcon from '../../shared/ToolbarIcon';

// When the check list button is pressed in the editor, if any of the selected
// text blocks have check list active then set checkList to false for all blocks.
// Otherwise set to true for all blocks.
const onToggle = (editor, isActive) => {
    editor.value.blocks.forEach(block => {
        editor.setNodeByKey(block.key, {
            data: { ...block.data.toJSON(), checkList: !isActive }
        });
    });
};

// Check list toolbar button.
export const CheckList = ({ editor }) => {
    // Is active if any of the selected blocks have the checkList data attribute.
    const isActive = editor.value.blocks.some(block => block.data.get('checkList'));
    return (
        <ToolbarIcon
            isActive={isActive}
            disabled={false}
            onToggle={() => onToggle(editor, isActive)}
            icon={'Done'}
            title={'Checkmark List Style'}
        />
    );
};
