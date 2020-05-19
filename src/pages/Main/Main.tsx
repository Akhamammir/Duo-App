import { IonButtons, IonContent, IonHeader, IonMenuButton,
    IonPage, IonTitle, IonToolbar, IonButton, IonIcon,
     IonRouterOutlet } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import MenuContainer from '../../components/MenuContainer/MenuContainer';
import OpexContainer from '../../components/OpexContainer/OpexContainer';
import CombContainer from '../../components/CombContainer/CombContainer';
import './Main.css';
interface ContainerProps {
    history: any;
  }
const Main: React.FC<ContainerProps> = ({history}) => {

  const { name } = useParams<{ name: string; }>();

  /*return (
    <IonPage>
      <IonHeader color="dark">
        <IonToolbar >
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );*/
  return (
    <IonPage>
      <IonHeader color="dark">
        <IonToolbar >
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              onClick={
                ()=>{
                  history.goBack('/')
                }
              }
            >
              <IonIcon slot="start" name="chevron-back-outline" />
                Regresar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
            <Route path="/main" component={MenuContainer} exact/>
            <Route path="/main/a" component={OpexContainer} />
            <Route path="/main/b" component={CombContainer} />
      </IonContent>
    </IonPage>
  );
};

export default Main;
