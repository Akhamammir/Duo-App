import React, {useState} from 'react';
import './ExploreContainer.css';
import logo from './logo.png'
import {IonInput, IonItem, IonLabel, IonButton} from '@ionic/react';
import axios from 'axios';
interface ContainerProps {
  name: string;
  history: any;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name, history }) => {
  const [usr, setUser] = useState<string>();
const [pwd, setPwd] = useState<string>();
  return (
    <div className="container">
      <img src={logo} width="60%"/>
      <br/><br/>
      <IonItem >
        <IonLabel position="floating" color="duop" >Usuario</IonLabel>
        <IonInput
          value={usr}
          color="duop"
          onIonChange={(e) => setUser(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <br/>
      <IonItem >
        <IonLabel position="floating" color="duop" >Contraseña</IonLabel>
        <IonInput
          value={pwd}
          color="duop"
          onIonChange={(e) => setPwd(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <br/>
      <IonButton
        color="duop"
        mode="ios"
        onClick={
          ()=>{
            history.push('/main')
            /*
            axios.post('/users', { usr: usr, pwd:pwd }).then(res => {
            if (res.data.Auth){
              history.push('/main')
            } else {
              alert('error de usuario')
            }
          })
            */
          }
        }
      >
        Ingresar
      </IonButton>
    </div>
  );
};

export default ExploreContainer;
