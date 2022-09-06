import { useCallback, useState } from "react";

export function useKeywords(mode, initValue) {
  const [values, setValues] = useState({ [mode]: initValue });

  const addKeyword = useCallback(
    (keyword) => {
      setValues((values) => ({ [mode]: [...values[mode], keyword] }));
    },
    [mode]
  );

  const deleteKeyword = useCallback(
    (deleteKeyword) => {
      let modified = values[mode];
      modified = modified.filter((keyword) => keyword !== deleteKeyword);
      setValues((values) => ({ ...values, [mode]: modified }));
    },
    [mode, values]
  );

  const reset = useCallback(() => setValues({}), []);

  return { values, addKeyword, deleteKeyword, reset };
}
//선택한 키워드 저장할 때 사용하는 훅.
//선호 키워드할 때는 mode prop을 'like'
//불호 키워드할 때는 mode props을 'hate'로 전달해주면 됨.
