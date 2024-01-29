export default function ColorPicker({
  setDrawingColor,
}: {
  setDrawingColor: (color: string) => void;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        style={{
          display: 'block',
          height: '100px',
          width: '100px',
          borderRadius: ' 50%',
          background: 'black',
          border: '1 solid black',
        }}
        onClick={() => setDrawingColor('black')}
      />
      <button
        style={{
          display: 'block',
          height: '100px',
          width: '100px',
          borderRadius: ' 50%',
          background: '#DC143C',
          border: '1 solid #DC143C',
        }}
        onClick={() => setDrawingColor('#DC143C')}
      />
      <button
        style={{
          display: 'block',
          height: '100px',
          width: '100px',
          borderRadius: ' 50%',
          background: '#32CD32',
          border: '1 solid #32CD32',
        }}
        onClick={() => setDrawingColor('#32CD32')}
      />
      <button
        style={{
          display: 'block',
          height: '100px',
          width: '100px',
          borderRadius: ' 50%',
          background: '#1E90FF',
          border: '1 solid #1E90FF',
        }}
        onClick={() => setDrawingColor('#1E90FF')}
      />
      <button
        style={{
          display: 'block',
          height: '100px',
          width: '100px',
          borderRadius: ' 50%',
          background: '#FFD700',
          border: '1 solid #FFD700',
        }}
        onClick={() => setDrawingColor('#FFD700')}
      />
    </div>
  );
}
