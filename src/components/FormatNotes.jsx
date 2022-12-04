import React from 'react';
import './FormatNotes.css';

export default function FormatNotes({ note }) {
  return <div class="note" dangerouslySetInnerHTML={{ __html: note }}></div>;
}
