import React from 'react';
import { TextAlignLeft, TextAlignCenter, TextAlignRight } from './TextAlign';
import { SmallText } from './SmallText';
import { CheckList} from "./CheckList";
import { StylesDropdown } from './StylesDropdown';
import { EditorToolbarDivider } from '@contentful/forma-36-react-components';

export default (props) => {
  return (
    <>
      {<EditorToolbarDivider testId="custom-divider" />}
      <SmallText {...props} />
      <TextAlignLeft {...props} />
      <TextAlignCenter {...props} />
      <TextAlignRight {...props} />
      <CheckList {...props} />
      {<EditorToolbarDivider testId="custom-divider" />}
      <StylesDropdown {...props} />
    </>
  );
};
