import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../redux/hooks';
import { ROW_NAMES } from '../utils/constants';
import { SET_DATA } from '../redux/actions';
import { createInitialState } from '../utils/helpers';
import { Spinner, Trash } from '../components/icons';
import { FileDrop } from 'react-file-drop';
import { Button } from '../components/generic';
import ImageKit from 'imagekit';
import { validFileExtensions } from '../utils/types';

const imagekit = new ImageKit({
  publicKey: 'public_gwKcX/++rPU4fc4RB/QMIYmJyq8=',
  privateKey: 'private_LU4ePNOgLAG6gWbVPUr7kkbinOA=',
  urlEndpoint: 'https://ik.imagekit.io/29vh5ato1/'
});

export default function Create() {
  const [rowNames, setRowNames] = useState(ROW_NAMES);
  const [files, setFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeRowName = (e: ChangeEvent<HTMLInputElement>) => {
    const names = [...rowNames];
    names[parseInt(e.target.id)] = e.target.value;
    setRowNames(names);
  };

  const handleUpload = (fileList: FileList | null) => {
    if (!fileList?.length) return;

    setError('');
    const failedUpload = (rej: (reason?: any) => void, err: Error | null) => {
      err ??= new Error();
      setError(
        'There was an error reading your files, make sure they are all images with an extension of .png, .jpg, or .jpeg'
      );
      rej(err);
      console.error(err);
    };

    const readFile = (file: File) =>
      new Promise((res, rej) => {
        if (!validFileExtensions.test(file.type))
          failedUpload(rej, new TypeError('Invalid file extension'));
        const reader = new FileReader();
        reader.onload = () => res(reader.result as string);
        reader.onerror = () => failedUpload(rej, reader.error);
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

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    const res = await Promise.all(
      files.map((file) =>
        imagekit.upload({
          file,
          fileName: 'image.' + file.match(/image\/(.*);base64/)?.at(1)
        })
      )
    );

    if (!res.every((r) => r.fileId)) {
      setUploading(false);
      setError(
        'There was an error uploading one or more of your images, please try again.'
      );
      return;
    }

    dispatch({
      type: SET_DATA,
      data: createInitialState(
        res.map((img) => img.url),
        rowNames
      )
    });
    return navigate('/builder');
  };

  return uploading ? (
    <div className="mt-1/3 mx-auto mt-[20%] flex max-w-[450px] flex-col items-center justify-center space-y-5 text-center text-4xl leading-relaxed">
      <Spinner size={100} className="animate-spin" />
      Uploading {files.length} images....
      <br />
      Creating your Tierbuilder...
    </div>
  ) : (
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
      <div className="space-y-2 md:w-1/2">
        <Label forId="images" text="Add Custom Images" />
        <form
          className="flex flex-col items-center space-y-6"
          onSubmit={handleFormSubmit}
        >
          <FileDrop
            className="flex h-32 w-96 items-center justify-center rounded-lg bg-slate-100 text-xl leading-8 outline-dashed outline-slate-300"
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
            onChange={(e) => {
              e.preventDefault();
              handleUpload(e.target.files);
            }}
          />
          <div className="max-w-[592px] leading-5">
            <p className="text-2xl">{files.length} Images</p>
            {files.length > 0 && (
              <p className="mb-2">Click on an image to remove it</p>
            )}
            <div className="flex flex-wrap">
              {files.map((uri, i) => (
                <div
                  role="file"
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
          {error && <span className="text-red-500">{error}</span>}
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
