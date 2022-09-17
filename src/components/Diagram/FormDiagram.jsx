import { useState, useRef } from 'react';
import Bargraphs from './FormBargraph';
import generateHtml from '../../services/generateHtml';
import generateCss from '../../services/generateCss';
import screenshot from '../../services/screenshot';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setMessage } from '../../store/messageSlice';

const FormDiagram = () => {
  const typeDiag = useRef();
  const [selectedDiag, setSelectedDiag] = useState('');
  const [download, setDownload] = useState();
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const diagramChangeHandler = () => {
    setSelectedDiag(typeDiag.current.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      diagramTitle: e.target.titlediagram.value,
      numberOfSection: e.target.selectsection.value,
      numberOfBlocks: e.target.blockssection.value,
      grid: e.target.grid.checked,
    };

    data.legend = {
      legend: e.target.legend.checked,
    };

    for (let i = 1; i <= e.target.colorPicker.length; i++) {
      data.legend[`color-${i}`] = e.target.colorPicker[i - 1].value;
      data.legend[`block-${i}-name`] = e.target.colorPicker[i - 1].parentElement.lastChild.value;
    }

    for (let i = 1; i <= data.numberOfSection; i++) {
      data[`section-${String(i)}`] = {};
      data[`section-${String(i)}`].title = e.target.sectitle[i - 1].value;
      data[`section-${String(i)}`].blocks = [];
      for (let j = 1; j <= data.numberOfBlocks; j++) {
        data[`section-${String(i)}`].blocks.push(
          e.target.sectitle[i - 1].parentElement.parentElement.children[j].lastChild.value
        );
      }
    }

    const css = generateCss(data);
    const code = generateHtml(data, css);

    const res = await screenshot(code, user.APIKey);

    if (res.ok) {
      const file = await res.blob();
      const objectURL = URL.createObjectURL(file);

      setDownload(objectURL);
    }
    if (!res?.ok) {
      const json = await res.json();
      dispatch(setMessage(json.message));
    }
  };

  const downloadButton = download ? (
    <button>
      <a href={download} download rel="noopener noreferrer">
        Download
      </a>
    </button>
  ) : (
    <button disabled>
      <span>Download</span>
    </button>
  );

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="select-diagram">Select diagram: </label>
        <select
          ref={typeDiag}
          onChange={diagramChangeHandler}
          name="select-diagram"
          id="select-diagram"
          required
        >
          <option defaultValue hidden></option>
          <option value="bargraphs">Bargraphs</option>
          <option value="/">Work in Progress</option>
        </select>
      </div>

      {selectedDiag === 'bargraphs' && <Bargraphs />}

      <div>
        <button type="sybmit">Submit</button>

        {downloadButton}
      </div>
    </form>
  );
};

export default FormDiagram;
