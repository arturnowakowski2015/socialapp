interface IProps {
  handleFileInput: (name: string) => void;
}

export function DropImage({ handleFileInput }: IProps) {
  return (
    <div>
      <form>
        <input
          className="file-input"
          type="file"
          onChange={(e) => handleFileInput(e.currentTarget.value)}
          name="file"
        />   
      </form>
    </div>
  );
}

 