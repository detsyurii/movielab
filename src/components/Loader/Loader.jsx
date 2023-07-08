import { Grid } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <>
      <Grid
        height="150"
        width="150"
        color="#2a363b"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
        visible={true}
      />
      <p
        style={{
          fontWeight: '600',
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        Loading...
      </p>
    </>
  );
};
