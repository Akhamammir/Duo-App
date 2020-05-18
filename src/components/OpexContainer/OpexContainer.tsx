import React, {useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo} from 'react';
import './OpexContainer.css';
import {IonInput, IonItem, IonLabel, IonButton,
    IonGrid, IonRow, IonCol, IonDatetime, IonToggle,
     IonSegment, IonSegmentButton, useIonViewDidEnter,
      IonPopover, IonList, IonAvatar} from '@ionic/react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import axios from 'axios';
interface ContainerProps {
  name: string;
  history: any;
}
let Storage = {
  machines:'', operador:'', place:'',
  hinicialT:'', hfinalT:'',
   hinicialM:'', hfinalM:'', hinicialO:'',
    hfinalO:'', hinicialR:'', hfinalR:'',
  gas:'', grease:'', diesel:'',
   oil:'', oilM:'', oilT:'',
  IdMaquina:'', IdEmpleado:''
}

let trigger = 0, x=0;
let triggerInner = 0
const One: React.FC = ({}) => {
  const [place, setPlace] = useState<string>();
  const [operador, setOper] = useState<string>();
  const [showPopoverInner, setShowPopoverInner] = useState(false);
  const [listInner, setListInner] = useState([]);
  useEffect(()=>{
    console.log('gg')
  }, [Storage.machines]);
  useEffect(()=>{
    Storage.operador = operador!
  }, [operador])
  useEffect(()=>{
    Storage.place = place!
  }, [place])
  useEffect(()=>{
    triggerInner > 0 ? (operador?.length == 0 ? console.log() : axios.get('http://duoserver.dyndns.org:3006/operadores?name='+operador).then(res=>{
      console.log(res.data.data)
      //alert(res.data.msg)
      setListInner(res.data.data[0])
      setShowPopoverInner(true)
    }) ): triggerInner+=1;
  },[operador])
  return( 
    <span>
      <IonPopover
        isOpen={showPopoverInner}
        onDidDismiss={e => setShowPopoverInner(false)}
        mode="ios"
      >
         <IonList lines="none">
           {
             listInner.map( (item:any) => {
              return(
                <IonItem
                  className="listingItem"
                  button={true}
                  onClick={()=>{
                      setOper(item.Nombre)
                      Storage.IdEmpleado = item.IdEmpleado
                      setShowPopoverInner(false)
                    }
                  }
                >
                  <IonAvatar slot="start">
                    <img src={item.picture}/>
                  </IonAvatar>
                  <IonLabel>
                    <h4>{item.Nombre}</h4>
                  </IonLabel>
                </IonItem>
              );
             }
            )
           }
         </IonList>
      </IonPopover>
      <br/>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel
              position="floating"
              color="duop"
            >
              Ingrese Operador
            </IonLabel>
            <IonInput
              value={operador}
              debounce = {450}
              color="duop"
              onIonChange={e => setOper(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel
              position="floating"
              color="duop"
            >
              Maquina
            </IonLabel>
            <IonInput
              value={Storage.machines}
              color="duop"
              readonly={true}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel
              position="floating"
              color="duop"
            >
              Ingrese Lugar
            </IonLabel>
            <IonInput
              value={place}
              onIonChange={e => setPlace(e.detail.value!)}
              color="duop"
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <br/>
    </span>
  )
}
const Two: React.FC = ({}) => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [hinicialT, setHiniT] = useState<string>();
  const [hfinalT, setHfinalT] = useState<string>();
  const [hinicialM, setHiniM] = useState<string>();
  const [hfinalM, setHfinalM] = useState<string>();
  const [hinicialO, setHiniO] = useState<string>();
  const [hfinalO, setHfinalO] = useState<string>();
  const [hinicialR, setHiniR] = useState<string>();
  const [hfinalR, setHfinalR] = useState<string>();
  useEffect(()=>{
    Storage.hinicialT = hinicialT!
  }, [hinicialT])
  useEffect(()=>{
    Storage.hfinalT = hfinalT!
  }, [hfinalT])
  useEffect(()=>{
    Storage.hinicialM = hinicialM!
  }, [hinicialM])
  useEffect(()=>{
    Storage.hfinalM = hfinalM!
  }, [hfinalM])
  useEffect(()=>{
    Storage.hinicialO = hinicialO!
  }, [hinicialO])
  useEffect(()=>{
    Storage.hfinalO = hfinalO!
  }, [hfinalO])
  useEffect(()=>{
    Storage.hinicialR = hinicialR!
  }, [hinicialR])
  useEffect(()=>{
    Storage.hfinalR = hfinalR!
  }, [hfinalR])
  return(
    <span>
      <IonRow>
        <IonCol class="ion-text-center">
          Horas de Trabajo:
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel>De:</IonLabel>
            <IonDatetime
              displayFormat="HH:mm"
              value={hinicialT}
              color="duop"
              onIonChange={e => setHiniT(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel>A:</IonLabel>
            <IonDatetime
              displayFormat="HH:mm"
              value={hfinalT}
              color="duop"
              onIonChange={e => setHfinalT(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol></IonCol>
      </IonRow>
      <IonRow>
        <IonCol></IonCol>
      </IonRow>
      <IonRow>
        <IonCol class="ion-text-center">
          Horas de Transporte:
        </IonCol>
      </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>De:</IonLabel>
                <IonDatetime
                  displayFormat="HH:mm"
                  value={hinicialM}
                  color="duop"
                  onIonChange={e => setHiniM(e.detail.value!)}
                ></IonDatetime>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>A:</IonLabel>
                <IonDatetime
                  displayFormat="HH:mm"
                  value={hfinalM}
                  color="duop"
                  onIonChange={e => setHfinalM(e.detail.value!)}
                ></IonDatetime>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol  class="ion-text-start">
              Horas Ociosas?
            </IonCol>
            <IonCol size="3">
              <IonItem lines="none" className="Oof">
                <IonToggle
                  checked={checked}
                  onIonChange={e => setChecked(e.detail.checked)}
                />
                <IonLabel>
                  { checked ? 'Si' : 'No' }
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          { checked ?
            <IonRow>
              <IonCol>
              <IonItem>
                <IonLabel>De:</IonLabel>
                <IonDatetime
                  displayFormat="HH:mm"
                  value={hinicialO}
                  color="duop"
                  onIonChange={e => setHiniO(e.detail.value!)}
                ></IonDatetime>
              </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel>A:</IonLabel>
                  <IonDatetime
                    displayFormat="HH:mm"
                    value={hfinalO}
                    color="duop"
                    onIonChange={e => setHfinalO(e.detail.value!)}
                  ></IonDatetime>
                </IonItem>
              </IonCol>
            </IonRow> 
            :
          <span></span> }
          <IonRow>
            <IonCol  class="ion-text-start">
              Horas de Reparacion?
            </IonCol>
            <IonCol size="3">
              <IonItem lines="none" className="Oof">
                <IonToggle
                  checked={checked2}
                  onIonChange={e => setChecked2(e.detail.checked)}
                />
                <IonLabel>
                  { checked2 ? 'Si' : 'No' }
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          { checked2 ?
            <IonRow>
              <IonCol>
              <IonItem>
                <IonLabel>De:</IonLabel>
                <IonDatetime
                  displayFormat="HH:mm"
                  value={hinicialR}
                  color="duop"
                  onIonChange={e => setHiniR(e.detail.value!)}
                ></IonDatetime>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>A:</IonLabel>
                <IonDatetime
                  displayFormat="HH:mm"
                  value={hfinalR}
                  color="duop"
                  onIonChange={e => setHfinalR(e.detail.value!)}
                ></IonDatetime>
              </IonItem>
            </IonCol>
            </IonRow> 
      :
        <span></span>
      }
    </span>
  );
}
const Three: React.FC = ({}) => {
  const [gas, setGas] = useState<string>();
  const [diesel, setDiesel] = useState<string>();
  const [grease, setGrease] = useState<string>();
  const [oil, setOil] = useState<string>();
  const [oilT, setOilT] = useState<string>();
  const [oilM, setOilM] = useState<string>();
  useEffect(()=>{
    Storage.gas = gas!
  }, [gas])
  useEffect(()=>{
    Storage.diesel = diesel!
  }, [diesel])
  useEffect(()=>{
    Storage.grease = grease!
  }, [grease])
  useEffect(()=>{
    Storage.oil = oil!
  }, [oil])
  useEffect(()=>{
    Storage.oilT = oilT!
  }, [oilT])
  useEffect(()=>{
    Storage.oilM = oilM!
  }, [oilM])
  return(
    <span>
      <br/>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonInput
              value={gas}
              placeholder="Gasolina"
              color="duop"
              onIonChange={e => setGas(e.detail.value!)}
            ></IonInput>
            <IonLabel
              position="fixed"
              color="duop"
            >
              Lts.
            </IonLabel>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonInput
              value={oil}
              placeholder="Aceite Hidraulico"
              color="duop"
              onIonChange={e => setOil(e.detail.value!)}
            ></IonInput>
            <IonLabel
              position="fixed"
              color="duop"
            >
              Lts.
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonInput
              value={diesel}
              placeholder="Diesel"
              color="duop"
              onIonChange={e => setDiesel(e.detail.value!)}
            ></IonInput>
            <IonLabel
              position="fixed"
              color="duop"
            >
              Lts.
            </IonLabel>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonInput
              value={oilT}
              placeholder="Aceite Transmision"
              color="duop"
              onIonChange={e => setOilT(e.detail.value!)}
            ></IonInput>
            <IonLabel
              position="fixed"
              color="duop"
            >
              Lts.
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonInput
              value={grease}
              placeholder="Grasa"
              color="duop"
              onIonChange={e => setGrease(e.detail.value!)}
            ></IonInput>
            <IonLabel
              position="fixed"
              color="duop"
            >
              Lts.
            </IonLabel>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonInput
              value={oilM}
              placeholder="Aceite Motor"
              color="duop"
              onIonChange={e => setOilM(e.detail.value!)}
            ></IonInput>
            <IonLabel
              position="fixed"
              color="duop"
            >
              Lts.
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
    </span>
  );
}
const OpexContainer: React.FC<ContainerProps> = ({ name, history }) => {
  const [machine, setInput] = useState<string>();
  const [hnicial, setHini] = useState<string>();
  const [hfinal, setHFin] = useState<string>();
  const [position, setPos] = useState<string>();
  const [list, setList] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const scanCode = async () => {
    const data = await BarcodeScanner.scan();
    //alert(JSON.stringify(data));
    let x = data.text;
    setInput(x)
  };
  useIonViewDidEnter(() => {
    setPos('0');
  });
  useEffect(()=>{
    Storage.machines=machine!
    console.log(Storage.machines)
  },[machine])
  useMemo(()=>{
    Storage.machines=machine!
    console.log(Storage.machines)
  },[machine])
  useEffect(()=>{
    trigger > 0 ? (machine?.length == 0 ? console.log() : axios.get('http://duoserver.dyndns.org:3006/equipos?name='+machine).then(res=>{
      console.log(res.data[0])
      //alert(res.data.msg)
      x=1
      setList(res.data[0])
      setShowPopover(true)
    }) ): trigger+=1;
  },[machine])
  
  return (
    <div className="container">
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={e => setShowPopover(false)}
        mode="ios"
      >
         <IonList lines="none">
           {
             list.map( (item:any) => {
              return(
                <IonItem
                  className="listingItem"
                  button={true}
                  onClick={()=>{
                      setInput(item.Nombre)
                      Storage.IdMaquina = item.IdMaquina
                      setShowPopover(false)
                    }
                  }
                >
                  <IonAvatar slot="start">
                    <img src={item.picture}/>
                  </IonAvatar>
                  <IonLabel>
                    <h4>{item.Nombre + ' Placas: ' + item.Placas}</h4>
                    {item.Descripcion.trim() + ' Año: ' + item.Anio}
                  </IonLabel>
                </IonItem>
              );
             }
            )
           }
         </IonList>
      </IonPopover>
      <IonGrid style={{marginLeft:'5vw', marginRight:'5vw'}}>
          <IonRow>
              <IonCol>
                <IonItem>
                    <IonLabel
                        position="floating"
                        color="duop"
                    >
                        Ingrese maquina
                    </IonLabel>
                    <IonInput
                      value={machine}
                      color="duop"
                      debounce={450}
                      onIonChange={
                        e => {
                          setInput(e.detail.value!);
                        }
                      }
                    ></IonInput>
                </IonItem>
              </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <IonItem >
                    <IonLabel position="floating" color="duop" >Horometro Inicial</IonLabel>
                    <IonInput
                      value={hnicial}
                      color="duop"
                      onIonChange={e => setHini(e.detail.value!)}
                    ></IonInput>
                </IonItem>
            </IonCol>
            <IonCol>
                <IonItem >
                    <IonLabel position="floating" color="duop" >Horometro Final</IonLabel>
                    <IonInput
                      value={hfinal}
                      color="duop"
                      onIonChange={e => setHFin(e.detail.value!)}
                    ></IonInput>
                </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
          </IonRow>

          <IonSegment
            value={position}
            onIonChange={
              e => {
                setPos(e.detail.value)
              }
            }
            mode="ios"
          >
          <IonSegmentButton value="0">
            <IonLabel>Operador</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="1">
            <IonLabel>Horas</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="2">
            <IonLabel>Combustibles</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {
          position == '0' ? <One/> : 
          position == '1' ? <Two/> : 
          position == '2' ? <Three/> : <One/>
        }
          
          
          <IonRow>
            <IonCol>
              <IonButton
                color="duop"
                mode="ios"
                expand="block"
                onClick={
                  scanCode
                }
              >
                Scan
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                color="duop"
                mode="ios"
                expand="block"
                onClick={
                  ()=>{
                    console.log({ContadorInicial:hnicial, ContadorFinal:hfinal,
                    HorasEfectivo: (new Date(Storage.hfinalT).getTime() - new Date(Storage.hinicialT).getTime())/3600000  })
                  }
                }
              >
                Aceptar
              </IonButton>
            </IonCol>
          </IonRow>
      </IonGrid>
    </div>
  );
};

export default OpexContainer;