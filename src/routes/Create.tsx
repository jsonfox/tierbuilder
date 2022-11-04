import { FormEvent, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../redux/hooks';
import { ROW_NAMES } from '../utils/constants';
import { SET_DATA } from '../redux/actions';
import { createInitialState } from '../utils/helpers';
import { Trash } from '../components/icons';
import { FileDrop } from 'react-file-drop';
import { Button } from '../components/generic';

export default function Create() {
  const [rowNames, setRowNames] = useState(ROW_NAMES);
  const [files, setFiles] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeRowName = (e: ChangeEvent<HTMLInputElement>) => {
    const names = [...rowNames];
    names[parseInt(e.target.id)] = e.target.value;
    setRowNames(names);
  };

  const handleUpload = (fileList: FileList | null) => {
    if (!fileList?.length) return;

    const readFile = (file: File) =>
      new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result as string);
        reader.onerror = () => rej(reader.error);
        reader.readAsDataURL(file);
      });

    Promise.all<any>(Array.from(fileList).map(readFile)).then((fileUrls) => {
      const allFiles = [...new Set([...files, ...fileUrls])];
      setFiles(allFiles);
    });
  };

  const removeImage = (uri: string) => {
    setFiles((files) => files.filter((file) => file !== uri));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: SET_DATA, data: createInitialState(files, rowNames) });
    return navigate('/builder');
  };

  return (
    <div className="flex flex-col items-center space-y-10 text-center">
      <div className="space-y-2">
        <Label forId="names" text="Customize Row Labels" />
        <div id="names" className="space-y-2">
          {ROW_NAMES.map((v, i) => (
            <input
              id={i.toString()}
              key={i}
              className="block w-60 rounded-sm px-2 text-lg outline outline-1"
              type="text"
              onChange={changeRowName}
              value={rowNames[i]}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2 space-y-2">
        <Label forId="images" text="Add Custom Images" />
        <form
          className="flex flex-col items-center space-y-6"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <FileDrop
            className="flex h-32 w-3/5 items-center justify-center rounded-lg bg-slate-100 text-xl leading-8 outline-dashed outline-slate-300"
            draggingOverTargetClassName="bg-green-50 outline-green-400"
            onDrop={(files) => handleUpload(files)}
          >
            <label
              className="flex h-full w-full cursor-pointer items-center justify-center"
              htmlFor="files"
            >
              Drop files here
              <br />
              or click to browse
            </label>
          </FileDrop>
          <input
            className="pointer-events-none absolute opacity-0"
            accept="image/png, image/jpeg, image/jpg"
            type="file"
            id="files"
            multiple={true}
            onChange={(e) => handleUpload(e.target.files)}
          />
          <div className="max-w-[592px] leading-5">
            <p className="text-2xl">{files.length} Images</p>
            {files.length > 0 && (
              <p className="mb-2">Click on an image to remove it</p>
            )}
            <div className="flex flex-wrap">
              {files.map((uri, i) => (
                <div
                  className="group ml-1 mt-1 flex h-20 w-20 items-center justify-center rounded-sm bg-cover hover:scale-105"
                  style={{ backgroundImage: `url(${uri})` }}
                  key={i}
                  onClick={() => removeImage(uri)}
                >
                  <Trash
                    className="text-red-500 opacity-0 group-hover:opacity-100"
                    size={24}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            className="w-1/5 text-xl"
            isInput
            type="submit"
            value="Create"
            disabled={files.length < 2}
          />
        </form>
      </div>
    </div>
  );
}

function Label({ forId, text }: { forId: string; text: string }) {
  return (
    <label htmlFor={forId} className="text-2xl font-bold">
      {text}
    </label>
  );
}
