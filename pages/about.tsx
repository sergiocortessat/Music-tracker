import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { useHistory } from 'react-router-dom';
import todoListState from '../../components/atom';

interface Props {

}

const about = (props: Props) => (
  <div>
    hello
  </div>
);

export default about;
