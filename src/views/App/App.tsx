import CatFeeder from '../CatFeeder/CatFeeder';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.shadow}>
        <CatFeeder />
      </div>
    </div>
  );
}

export default App;
