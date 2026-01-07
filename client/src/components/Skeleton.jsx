const Skeleton = ({ height = 20, width = '100%' }) => (
  <div
    style={{
      height,
      width,
      borderRadius: '8px',
      background:
        'linear-gradient(90deg, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.2) 37%, rgba(255,255,255,0.08) 63%)',
      backgroundSize: '400% 100%',
      animation: 'skeleton 1.4s ease infinite',
      marginBottom: '10px',
    }}
  />
);

export default Skeleton;
