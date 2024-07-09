import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Main } from '@/pages/main';
import { NotFound } from '@/pages/not-found';
import { Repository } from '@/pages/repository';

import './styles/global.scss';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:repository" element={<Repository />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
