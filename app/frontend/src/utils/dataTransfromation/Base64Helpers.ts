export function dataURLtoFile(dataUrl: string, fileName: string) {
  const arr = dataUrl.split(',');

  if (arr && arr.length > 0) {
    const mimeMatch = arr[0].match(/:(.*?);/);

    if (mimeMatch && mimeMatch.length > 1) {
      const mime = mimeMatch[1];
      const bstr = atob(arr[arr.length - 1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: mime });
    }
  }
}
