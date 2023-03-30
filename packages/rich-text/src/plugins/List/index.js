import React from 'react';
import { BLOCKS } from '@contentful/rich-text-types';
import ToolbarIcon from '../shared/ToolbarIcon';
import commonNode from '../shared/NodeDecorator';
import listToggleDecorator from './ToolbarDecorator';
import EditListWrapper from './EditListWrapper';

export const ListPlugin = () => {
  return {
    ...EditListWrapper(),
    renderNode: (props, _editor, next) => {
      if (props.node.type === BLOCKS.UL_LIST) {
        return commonNode('ul')(props);
      } else if (props.node.type === BLOCKS.OL_LIST) {
        return commonNode('ol')(props);
      } else if (props.node.type === BLOCKS.LIST_ITEM) {
        const styles = { style: {}};

        let isCheckList = false;
        props.children.forEach(child => {
          if (child.props.node.data.get("checkList")) isCheckList = true;
        })

        if (isCheckList) {
          styles.style.paddingLeft = "3px";
          styles.style.listStyle = "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDE0IDEwIj48cG9seWxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTU4RUFBIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgcG9pbnRzPSIwIDE0Ny42MjcgNC45MTIgMTUyIDExLjI1MiAxNDUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMTI5IC0xNDMuMTYpIi8+PC9zdmc+)";
        }

        if (isCheckList && !props.node.data.get("checkList")) {
          _editor.setNodeByKey(props.node.key, {
            data: { ...props.node.data.toJSON(), checkList: true }
          });
        }
        else if (!isCheckList && props.node.data.get("checkList")) {
          _editor.setNodeByKey(props.node.key, {
            data: { ...props.node.data.toJSON(), checkList: false }
          });
        }
        return commonNode('li', styles)(props);
      }
      return next();
    }
  };
};

export const UnorderedList = listToggleDecorator({
  type: BLOCKS.UL_LIST,
  title: 'UL',
  icon: 'ListBulleted'
})(props => <ToolbarIcon {...props} />);

export const OrderedList = listToggleDecorator({
  type: BLOCKS.OL_LIST,
  title: 'OL',
  icon: 'ListNumbered'
})(props => <ToolbarIcon {...props} />);
