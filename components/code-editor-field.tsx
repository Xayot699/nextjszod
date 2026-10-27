"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

type Props = {
  defaultValue?: string;
};

export default function CodeEditorField({
  defaultValue = "",
}: Props) {
  const [code, setCode] = useState(defaultValue);

  return (
    <div>
      <Editor
        height="300px"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => {
          setCode(value ?? "");
        }}
      />

      <input
        type="hidden"
        name="code"
        value={code}
      />
    </div>
  );
}