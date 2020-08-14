import React, {useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo} from 'react';
import './OpexContainer.css';
import {
  IonInput, IonItem, IonLabel, IonButton, IonGrid,
   IonRow, IonCol, IonDatetime, IonToggle, IonSegment,
    IonSegmentButton, useIonViewDidEnter, IonPopover,IonList,
     IonAvatar, IonTextarea,IonActionSheet, IonImg, IonToast
} from '@ionic/react';
import logo from './../logo.png'
import { trash, share, caretForwardCircle, heart, close } from 'ionicons/icons';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import axios from 'axios';
interface ContainerProps {
  name: string;
  history: any;
}
let Storage:{ [key: string]: any } = {
  machines:'', operador:'', place:'',
  hinicialT:'', hfinalT:'',
  hinicialM:'', hfinalM:'', hinicialO:'',
  hfinalO:'', hinicialR:'', hfinalR:'',
  gas:'', grease:'', diesel:'',
  oil:'', oilM:'', oilT:'',
  IdMaquina:'', IdEmpleado:'',IdObra:'',
  tipoCombustible:'', checked:false,
  gasDisplay: {
    DIESEL:false,
    GASOLINA:false,
    //OTRO:false,
    //ELECTRICIDAD:false
  }
}

let triggerInner = -1, triggerInner2 = -1, trigger = -1;

const One: React.FC = ({}) => {
  const [place, setPlace] = useState<string>();
  const [operador, setOper] = useState<string>();
  const [toastMsgInner, settoastMsgInner] = useState<string>();
  const [toastColorInner, settoastColorInner] = useState<string>();
  const [showToastInner, setShowToastInner] = useState(false);
  const [showPopoverInner, setShowPopoverInner] = useState(false);
  const [showPopoverInner2, setShowPopoverInner2] = useState(false);
  const [listInner, setListInner] = useState([]);
  const [listInnerData, setListInnerData] = useState([]);
  const [listInnerData2, setListInnerData2] = useState([]);
  const innerdata1:any = [], innerdata2:any = [];
  /*{
    text: 'RTX-008, Retroexcavadora mod 2013',
    handler: () => {
      console.log('Delete clicked');
    }
  }*/
  useEffect(()=>{
    console.log('gg', Storage.operador)
    setOper(Storage.operador)
    setPlace(Storage.place)
  }, [Storage.machines]);
  
  useEffect(()=>{
    //Storage.operador = operador!
    
  }, [operador])
  
  useEffect(()=>{
    // Storage.place = place!
  }, [place])
  
  useEffect(()=>{
    setOper(Storage.operador);
    setPlace(Storage.place);

  }, [])
  
  /*useEffect( () => {
    triggerInner === 0 ? (operador?.length == 0 ? console.log() : axios.get('http://187.190.97.136:3006/operadores?name='+operador).then(res=>{
      console.log(res.data.data)
      //alert(res.data.msg)
      setListInner(res.data.data[0])
      res.data.data[0].forEach((item:any)=>{
        innerdata1.push({
          text: item.Nombre,
          handler: () => {
            setOper(item.Nombre)
            Storage.IdEmpleado = item.IdEmpleado
            Storage.operador= item.Nombre
            setShowPopoverInner(false)
          }
        })
        setListInnerData(innerdata1)
      })
      setShowPopoverInner(true)
    }) ): triggerInner = triggerInner + 1;
  },[operador])*/

  let opexList = () => {
    axios.get('http://187.190.97.136:3006/operadores?name='+ '' ).then(res=>{
      console.log(res.data.data)
      //alert(res.data.msg)
      setListInner(res.data.data[0])
      res.data.data[0].forEach((item:any)=>{
        innerdata1.push({
          text: item.Nombre,
          handler: () => {
            setOper(item.Nombre)
            Storage.IdEmpleado = item.IdEmpleado
            Storage.operador= item.Nombre
            setShowPopoverInner(false)
          }
        })
        setListInnerData(innerdata1)
      })
      setShowPopoverInner(true)
    }).catch( e => {
      settoastColorInner("danger")
      settoastMsgInner("Revisa tu conexion a internet!")
      setShowToastInner(true)
    } )
  }

  /*useEffect(() => {
    triggerInner2 === 0 ? (place?.length == 0 ? console.log() : axios.get('http://187.190.97.136:3006/obras?name=' + place).then(res => {
      //alert(res.data.msg)
      setListInner(res.data[0])
      res.data[0].forEach((item:any)=>{
        innerdata2.push({
          text: item.IdObra,
          handler: () => {
            setPlace(item.IdObra);
              Storage.IdObra = item.IdObra;
              Storage.place = item.Descripcion;
              setShowPopoverInner2(false);
            }
        })
        setListInnerData2(innerdata2)
      })
      setShowPopoverInner2(true)
    })) : triggerInner2 = triggerInner2 + 1;
  }, [place]) */

  let placeList = () => {
    axios.get('http://187.190.97.136:3006/obras?name=' + '').then(res => {
      //alert(res.data.msg)
      setListInner(res.data[0])
      res.data[0].forEach((item:any)=>{
        innerdata2.push({
          text: item.IdObra,
          handler: () => {
            setPlace(item.IdObra);
              Storage.IdObra = item.IdObra;
              Storage.place = item.Descripcion;
              setShowPopoverInner2(false);
            }
        })
        setListInnerData2(innerdata2)
      })
      setShowPopoverInner2(true)
    }).catch( e => {
      settoastColorInner("danger")
      settoastMsgInner("Revisa tu conexion a internet!")
      setShowToastInner(true)
    } )
  }

  return( 
    <span>
      <IonPopover
        isOpen={false}
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
                      Storage.operador= item.Nombre
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
      <IonPopover
        isOpen={false}
        onDidDismiss={e => setShowPopoverInner2(false)}
        mode="ios"
      >
        <IonList lines="none"> 
        {
            listInner.map((item:any) => {
              return(
                <IonItem
                  className="listingItem"
                  button={true}
                  onClick={()=>{
                    setPlace(item.IdObra);
                      Storage.IdObra = item.IdObra;
                      Storage.place = item.Descripcion;
                      setShowPopoverInner2(false);
                    }
                  }
              >
                <IonLabel>
                  <h4>{item.IdObra}</h4>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonPopover>
      <IonActionSheet
        isOpen={showPopoverInner}
        mode="ios"
        onDidDismiss={() => setShowPopoverInner(false)}
        cssClass='actionsheet'
        buttons={listInnerData}
      >
      </IonActionSheet>
      <IonActionSheet
        isOpen={showPopoverInner2}
        mode="ios"
        onDidDismiss={() => setShowPopoverInner2(false)}
        cssClass='actionsheet'
        buttons={listInnerData2}
      >
      </IonActionSheet>
      <IonToast
        isOpen={showToastInner}
        onDidDismiss={() => setShowToastInner(false)}
        message= { toastMsgInner }
        color= { toastColorInner }
        duration={1750}
      />
      <br />
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating" color="duop">
              Ingrese Operador
            </IonLabel>
            <IonInput
              value={operador}
              debounce={450}
              color="duop"
              readonly={true}
              clearInput={true}
              onClick={ () => opexList() }
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating" color="duop">
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
            <IonLabel position="floating" color="duop">
              Ingrese Lugar
            </IonLabel>
            <IonInput
              value={place}
              debounce={500}
              clearInput={true}
              readonly={true}
              onClick={ () => placeList() }
              color="duop"
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <br />
    </span>
  );
};

const Two: React.FC = ({}) => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [hinicialT, setHiniT] = useState<string>();
  const [hfinalT, setHfinalT] = useState<string>();
  const [hinicialM, setHiniM] = useState<string>();
  const [hfinalM, setHfinalM] = useState<string>();
  const [hinicialO, setHiniO] = useState<string>();
  const [hfinalO, setHfinalO] = useState<string>();
  const [hinicialR, setHiniR] = useState<string>();
  const [hfinalR, setHfinalR] = useState<string>();
  useEffect(()=>{
    // Storage.hinicialT = hinicialT!
  }, [hinicialT])
  useEffect(()=>{
    // Storage.hfinalT = hfinalT!
  }, [hfinalT])
  useEffect(()=>{
    // Storage.hinicialM = hinicialM!
  }, [hinicialM])
  useEffect(()=>{
    // Storage.hfinalM = hfinalM!
  }, [hfinalM])
  useEffect(()=>{
    // Storage.hinicialO = hinicialO!
  }, [hinicialO])
  useEffect(()=>{
    // Storage.hfinalO = hfinalO!
  }, [hfinalO])
  useEffect(()=>{
    // Storage.hinicialR = hinicialR!
  }, [hinicialR])
  useEffect(()=>{
    // Storage.hfinalR = hfinalR!
  }, [hfinalR])

  useEffect(()=>{
    // Storage.hfinalR = hfinalR!
    setHiniT(Storage.hinicialT)
    setHfinalT(Storage.hfinalT)
    setHiniM(Storage.hinicialM)
    setHfinalM(Storage.hfinalM)
    setHiniO(Storage.hinicialO)
    setHfinalO(Storage.hfinalO)
    setHiniR(Storage.hinicialR)
    setHfinalR(Storage.hfinalR)
  }, [])

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
              mode="ios"
              onIonChange={e => {
                setHiniT(e.detail.value!)
                Storage.hinicialT=e.detail.value!
              }}
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
              mode="ios"
              onIonChange={(e) => {
                setHfinalT(e.detail.value!)
                Storage.hfinalT=e.detail.value!

              }}
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
        <IonCol class="ion-text-center">Horas de Transporte:</IonCol>
      </IonRow>
      <IonRow>
        <IonCol class="ion-text-start">Horas Ociosas?</IonCol>
        <IonCol size="3">
          <IonItem lines="none" className="Oof">
            <IonToggle
              checked={checked}
              onIonChange={(e) => { setChecked(e.detail.checked); Storage.checked = e.detail.checked }}
            />
            <IonLabel>{checked ? "Si" : "No"}</IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      { checked ? 
      (<IonRow>
        <IonCol>
          <IonItem>
            <IonLabel>De:</IonLabel>
            <IonDatetime
              displayFormat="HH:mm"
              value={hinicialM}
              color="duop"
              mode="ios"
              onIonChange={(e) => {
                setHiniM(e.detail.value!)
                Storage.hinicialM=e.detail.value!
              }}
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
              mode="ios"
              onIonChange={(e) => {
                setHfinalM(e.detail.value!)
                Storage.hfinalM=e.detail.value!
              }}
            ></IonDatetime>
          </IonItem>
        </IonCol>
      </IonRow>) :
      (<span></span>) }
      <IonRow>
        <IonCol></IonCol>
      </IonRow>
      <IonRow>
        <IonCol></IonCol>
      </IonRow>
      <IonRow>
        <IonCol class="ion-text-start">Horas de transporte?</IonCol>
        <IonCol size="3">
          <IonItem lines="none" className="Oof">
            <IonToggle
              checked={checked2}
              onIonChange={(e) => setChecked2(e.detail.checked)}
            />
            <IonLabel>{checked2 ? "Si" : "No"}</IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      {checked2 ? (
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>De:</IonLabel>
              <IonDatetime
                displayFormat="HH:mm"
                value={hinicialO}
                color="duop"
                mode="ios"
                onIonChange={(e) => {
                  setHiniO(e.detail.value!)
                  Storage.hinicialO=e.detail.value!
                }}
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
                mode="ios"
                onIonChange={(e) => {
                  setHfinalO(e.detail.value!)
                  Storage.hfinalO=e.detail.value!
                }}
              ></IonDatetime>
            </IonItem>
          </IonCol>
        </IonRow>
      ) : (
        <span></span>
      )}
      <IonRow>
        <IonCol class="ion-text-start">Horas de Reparacion?</IonCol>
        <IonCol size="3">
          <IonItem lines="none" className="Oof">
            <IonToggle
              checked={checked3}
              onIonChange={(e) => setChecked3(e.detail.checked)}
            />
            <IonLabel>{checked3 ? "Si" : "No"}</IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      {checked3 ? (
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>De:</IonLabel>
              <IonDatetime
                displayFormat="HH:mm"
                value={hinicialR}
                color="duop"
                mode="ios"
                onIonChange={(e) => {
                  setHiniR(e.detail.value!)
                  Storage.hinicialR=e.detail.value!
                }}
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
                mode="ios"
                onIonChange={(e) => {
                  setHfinalR(e.detail.value!)
                  Storage.hfinalR=e.detail.value!
                }}
              ></IonDatetime>
            </IonItem>
          </IonCol>
        </IonRow>
      ) : (
        <span></span>
      )}
    </span>
  );
};

const Three: React.FC = ({}) => {
  const [gas, setGas] = useState<string>();
  const [diesel, setDiesel] = useState<string>();
  const [grease, setGrease] = useState<string>();
  const [oil, setOil] = useState<string>();
  const [oilT, setOilT] = useState<string>();
  const [oilM, setOilM] = useState<string>();
  const [enablegas, setenablegas] = useState(false);
  useEffect(() => {
    // Storage.gas = gas!;
    console.log(100100100100010)
  }, [Storage.tipoCombustible]);
  useEffect(() => {
    // Storage.diesel = diesel!;
  }, [diesel]);
  useEffect(() => {
    // Storage.grease = grease!;
  }, [grease]);
  useEffect(() => {
    // Storage.oil = oil!;
  }, [oil]);
  useEffect(() => {
    // Storage.oilT = oilT!;
  }, [oilT]);
  useEffect(() => {
    // Storage.oilM = oilM!;
  }, [oilM]);

  useEffect(() => {
    setGas(Storage.gas)
    setDiesel(Storage.diesel)
    setGrease(Storage.grease)
    setOil(Storage.oil)
    setOilT(Storage.oilT)
    setOilM(Storage.oilM)
    setenablegas(Storage.tipoCombustible.DIESEL)
  }, [])
  return (
    <span>
      <br />
      { Storage.gasDisplay.GASOLINA ?
      <IonRow>
      <IonCol>
        <IonItem>
          <IonInput
            value={gas}
            placeholder="Gasolina"
            color="duop"
            type="number"
            clearInput={true}
            onIonChange={(e) => {
              setGas(e.detail.value!)
              Storage.gas=e.detail.value!
            }}
          ></IonInput>
          <IonLabel position="fixed" color="duop">
            Lts.
          </IonLabel>
        </IonItem>
      </IonCol>
    </IonRow> :
    <span></span> }
      { Storage.gasDisplay.DIESEL ?
      <IonRow>
      <IonCol>
        <IonItem>
          <IonInput
            value={diesel}
            placeholder="Diesel"
            color="duop"
            type="number"
            clearInput={true}
            onIonChange={(e) => {
              setDiesel(e.detail.value!)
              Storage.diesel=e.detail.value!
            }}
          ></IonInput>
          <IonLabel position="fixed" color="duop">
            Lts.
          </IonLabel>
        </IonItem>
      </IonCol>
    </IonRow> : 
    <span></span> }
      { Storage.gasDisplay.CTHULU ? <IonRow>
        <IonCol>
          <IonItem>
            <IonInput
              value={grease}
              placeholder="Gasolina Magna"
              color="duop"
              clearInput={true}
              type="number"
              onIonChange={(e) => {
                setGrease(e.detail.value!)
                Storage.grease=e.detail.value!
              }}
            ></IonInput>
            <IonLabel position="fixed" color="duop">
              Lts.
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>: 
    <span></span>}
    </span>
  );
};

const OpexContainer: React.FC<ContainerProps> = ({ name, history }) => {
  const [machine, setInput] = useState<string>();
  const [machineL, setInputL] = useState<string>();
  const [hnicial, setHini] = useState<string>();
  const [hfinal, setHFin] = useState<string>();
  const [position, setPos] = useState<string>();
  const [Notas, setNotas] = useState<string>();
  const [NotasComb, setNotasComb] = useState<string>();
  const [Fecha, setFecha] = useState<string>();
  const [Folio, setFolio] = useState<string>();
  const [hnicialComb, setHiniComb] = useState<string>();
  const [toastMsg, settoastMsg] = useState<string>();
  const [toastColor, settoastColor] = useState<string>();
  const [list, setList] = useState([]);
  const [listData, setListData] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [enableButton, setenableButton] = useState(false);

  const testdata = [{
    text: 'RTX-008, Retroexcavadora mod 2013',
    handler: () => {
      console.log('Delete clicked');
    }
  }, {
    text: 'MTC-004, Motoconformadora mod 2013',
    handler: () => {
      console.log('Share clicked');
    }
  }, {
    text: 'AV-007, Apisonador vibratorio mod 2018',
    handler: () => {
      console.log('Play clicked');
    }
  }, {
    text: 'RTX-013, Retroexcavadora mod 2019',
    handler: () => {
      console.log('Favorite clicked');
    }
  }, {
    text: 'Cancelar',
    role: 'destructive',
    icon: close,
    handler: () => {
      console.log('Cancel clicked');
    }
  }]

  const listdata:any= []

  const scanCode = async () => {
    const data = await BarcodeScanner.scan();
    //alert(JSON.stringify(data));
    let x = data.text;
    machineList(x)
    setInput(x);
  };

  useIonViewDidEnter(() => {
    setPos("0");
    console.log(validator());
    Reset();
    setenableButton(true)
    //android:windowSoftInputMode="adjustNothing"
    //getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
  });
  //----------------------
  useEffect(() => {
    Storage.machines = machine!;
    console.log(Storage.machines);
  }, [machine]);

  useMemo(() => {
    Storage.machines = machine!;
    console.log(Storage.machines);
  }, [machine]);
  //---------------------
  /*
  useEffect(() => {
    trigger === 0
      ? machine?.length == 0
        ? console.log()
        : axios.get("http://187.190.97.136:3006/equipos/main?name=" + machine)
            .then((res) => {
              console.log(res.data[0]);
              //alert(res.data.msg)
              res.data[0].forEach((item:any)=>{
                console.log(item)
                listdata.push({
                  text: item.IdEquipo + ', ' + item.Nombre,
                  handler: () => {
                    triggerInner = -1; triggerInner2 = -1; trigger = -1;
                    setHini(item.ContadorActualEquipo)
                    axios.get("http://187.190.97.136:3006/equipos/driver?name=" + item.IdEmpleadoOperador)
                      .then((res) => {
                      console.log(res.data);
                      Storage.operador = res.data[0][0].Nombre
                      Storage.IdEmpleado = res.data[0][0].IdEmpleado
                    })
                    axios.get("http://187.190.97.136:3006/equipos/obras?name=" + item.IdObra)
                      .then((res) => {
                      console.log(res.data[0][0]);
                      Storage.place = res.data[0][0].NombreCorto
                      Storage.IdObra = res.data[0][0].IdObra
                    }).then(()=>{ 
                      Storage.IdMaquina = item.IdEquipo;
                      setInput(item.Nombre);
                      setInputL(item.IdEquipo);
                    })
                    
                    Storage.tipoCombustible= item.TipoCombustible
                    setShowPopover(false);
                  }
                })
                setListData(listdata)
              })
              setList(res.data[0]);
              setShowPopover(true);
            })
      : (trigger += 1);
  }, [machine]);*/
  
  let machineList = (maq?:string) => {
      axios.get("http://187.190.97.136:3006/equipos/main?name=" + (maq ? maq : ''))
            .then((res) => {
              console.log(res.data[0]);
              //alert(res.data.msg)
              res.data[0].forEach((item:any)=>{
                console.log(item)
                listdata.push({
                  text: item.IdEquipo + ', ' + item.Nombre,
                  handler: () => {
                    triggerInner = -1; triggerInner2 = -1; trigger = -1;
                    setHini(item.ContadorActualEquipo)
                    axios.get("http://187.190.97.136:3006/equipos/driver?name=" + item.IdEmpleadoOperador)
                      .then((res) => {
                      console.log(res.data);
                      Storage.operador = res.data[0][0].Nombre
                      Storage.IdEmpleado = res.data[0][0].IdEmpleado
                    })
                    axios.get("http://187.190.97.136:3006/equipos/obras?name=" + item.IdObra)
                      .then((res) => {
                      console.log(res.data[0][0]);
                      Storage.place = res.data[0][0].NombreCorto
                      Storage.IdObra = res.data[0][0].IdObra
                      Storage.IdFamEq = res.data[0][0].IdFamiliaEquipo
                    }).then(()=>{ 
                      Storage.IdMaquina = item.IdEquipo;
                      setInput(item.Nombre);
                      setInputL(item.IdEquipo);
                    })
                    Storage.tipoCombustible= item.TipoCombustible
                    Storage.gasDisplay[Storage.tipoCombustible.trim()] = true
                    console.log(Storage)
                    setShowPopover(false);
                  }
                })
                setListData(listdata)
              })
              setList(res.data[0]);
              setShowPopover(true);
            }).catch( e => {
              settoastColor("danger")
              settoastMsg("Revisa tu conexion a internet!")
              setShowToast1(true)
            } )
  }

  let Reset = (() => {
    Storage = {
      machines:'', operador:'', place:'',
      hinicialT:'', hfinalT:'',
      hinicialM:'', hfinalM:'', hinicialO:'',
      hfinalO:'', hinicialR:'', hfinalR:'',
      gas:'', grease:'', diesel:'',
      oil:'', oilM:'', oilT:'',
      IdMaquina:'', IdEmpleado:'',IdObra:'',
      tipoCombustible:'', checked:false,
      gasDisplay: {
        DIESEL:false,
        GASOLINA:false,
        //OTRO:false,
        //ELECTRICIDAD:false
      }
    }
    setFolio('');
    setFecha('');
    setInput('');
    setHini('');
    setHFin('');
    setInput('')
  });

  let numeroloogy = (x:string) => {
    x = x && x.indexOf('.') != -1 && x.split('.')[1].length > 2 ? 
     x.split('.')[0] + '.' + x.split('.')[1].substring(0,1) : x;
    return x;
  }

  let validator = () => {
     let x = true;
     let start:{ [key: string]: any } =  Storage.checked ? {
      machines:'', operador:'', place:'',
      gas:'', grease:'', diesel:'',
      oil:'', oilM:'', oilT:'',
      IdMaquina:'', IdEmpleado:'',IdObra:'',
      tipoCombustible:''
    } : {
      machines:'', operador:'', place:'',
      gas:'', grease:'', diesel:'',
      oil:'', oilM:'', oilT:'',
      IdMaquina:'', IdEmpleado:'',IdObra:'',
      tipoCombustible:''
    }
    let data:{ [key: string]: any } = {
      // Fecha: new Date(),
      ContadorInicial: hnicial, //Horometro Inicial
      ContadorFinal: hfinal, //Horometro Inicial
      FolioInternoSuministro:Folio,
      Notas:Notas, Fecha:Fecha,
      ContadorEquipo: hnicialComb
    }
    for(let key in start){
      //console.log(key)
      if (Storage[key] == start[key]){
        //console.log(Storage[key], start[key], (Storage[key] == start[key]) )
        x = false;
      }
    }
    for(let key2 in data){
      if (data[key2] == undefined || data[key2] == '') {
        x=false
      } 
    }

     return x;
  }

  let Setup = () => {
    Storage = {
      machines:'', operador:'', place:'',
      hinicialT:'', hfinalT:'',
      hinicialM:'', hfinalM:'', hinicialO:'',
      hfinalO:'', hinicialR:'', hfinalR:'',
      gas:'', grease:'', diesel:'',
      oil:'', oilM:'', oilT:'',
      IdMaquina:'', IdEmpleado:'',IdObra:'',
      tipoCombustible:'', checked:false
    }
  }

  const handleSubmit = () => {
    if ( validator && +hfinal! > +hnicial! && 
       ( +hnicial! + ( Storage.IdFamEq == '3' ? 5000 : 12 ) ) > +hfinal! &&
        +hnicialComb! > +hnicial! &&
        (Storage.checked ? new Date(Storage.hfinalM).getTime() > new Date(Storage.hinicialM).getTime() : true)  ) {
      setenableButton(false)
      const {
        IdEmpleado,
        IdMaquina,
        IdObra,
        hinicialM,
        hfinalM, //Horas de transporte
        hinicialR,
        hfinalR, //Horas de Reparación
        hinicialT,
        hfinalT, //Horas de Trabajo
        hinicialO,
        hfinalO, //Horas Ociosas
        machines,
        operador,
        diesel,
        gas,
        grease,
        oil,
        oilM,
        oilT,
        place,
        tipoCombustible,
      } = Storage;
  
      const data = {
        IdEquipo: IdMaquina,
        IdEmpleadoOperador: IdEmpleado,
        IdObra :IdObra,
        // Fecha: new Date(),
        ContadorInicial: hnicial, //Horometro Inicial
        ContadorFinal: hfinal, //Horometro Inicial
        HrsEspera: Storage.checked ? (new Date(hfinalM).getTime() - new Date(hinicialM).getTime()) / 3600000 : 0, //horas de trasnporte
        //HrsInactivo:(new Date(hfinalO).getTime() - new Date(hinicialO).getTime()) / 3600000, //Horas Ociosas
        //HrsMantenimiento:(new Date(hfinalR).getTime() - new Date(hinicialR).getTime()) / 3600000, //Horas de Reparación
        HrsEfectivo: +hfinal! - +hnicial!, //Horas de Trabajo
        TipoCombustible:tipoCombustible,
        CantidadGas: gas,
        CantidadDiesel:diesel,
        CantidadGrease:grease,
        CantidadOil:oil,
        CantidadOilM:oilM,
        CantidadOilT:oilT,
        FolioInternoSuministro:Folio,
        Notas:Notas, Fecha:Fecha,
        ContadorEquipo: hnicialComb, NotasComb:NotasComb
      };

      axios.post('http://187.190.97.136:3006/registro', { data }).then(res => {
        console.log(res);
        settoastColor("success")
        settoastMsg("Registro realizado exitosamente!")
        setShowToast1(true)
        setenableButton(true)
        Reset();
      }).catch( error => {
        console.log(error)
        settoastColor("danger")
        settoastMsg("Hubo un error, revisa el llenado de datos y tu conexion a internet!")
        setShowToast1(true)
        setenableButton(true)
      });
    } else {
      settoastColor("danger")
      settoastMsg("Revisa tus datos!")
      setShowToast1(true)
    }
  };
      /*
      {ContadorInicial:hnicial, ContadorFinal:hfinal,HorasEfectivo: (new Date(Storage.hfinalT).getTime() - new Date(Storage.hinicialT).getTime())/3600000})
      */
  return (
    <div className="container">
      <IonPopover
        isOpen={false}
        onDidDismiss={(e) => setShowPopover(false)}
        mode="ios"
      >
        <IonList lines="none">
          {list.map((item: any) => {
            return (
              <IonItem
                className="listingItem"
                button={true}
                onClick={() => {
                  triggerInner = -1; triggerInner2 = -1; trigger = -1;
                  setHini(item.ContadorActualEquipo)
                  axios.get("http://187.190.97.136:3006/equipos/driver?name=" + item.IdEmpleadoOperador)
                    .then((res) => {
                    console.log(res.data[0][0]);
                    Storage.operador = res.data[0][0].Nombre
                    Storage.IdEmpleado = res.data[0][0].IdEmpleado
                  })
                  axios.get("http://187.190.97.136:3006/equipos/obras?name=" + item.IdObra)
                    .then((res) => {
                    console.log(res.data[0][0]);
                    Storage.place = res.data[0][0].NombreCorto
                    Storage.IdObra = res.data[0][0].IdObra
                  }).then(()=>{ 
                    Storage.IdMaquina = item.IdEquipo;
                    setInput(item.Nombre);
                  })
                  
                  Storage.tipoCombustible= item.TipoCombustible
                  setShowPopover(false);
                }}
              >
                <IonAvatar slot="start">
                  <img src={item.picture} />
                </IonAvatar>
                <IonLabel>
                  <h4>{item.IdEquipo + " Nombre: " + item.Nombre}</h4>
                  {item.Descripcion.trim() + " Año: " + item.Anio}
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonPopover>
      <IonActionSheet
        isOpen={showPopover}
        mode="ios"
        onDidDismiss={() => setShowPopover(false)}
        cssClass='actionsheet'
        buttons={listData}
      >
      </IonActionSheet>
      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message= { toastMsg }
        color= { toastColor }
        duration={1750}
      />
      <IonImg src={logo} className="logo" />
      <IonGrid style={{ marginLeft: "5vw", marginRight: "5vw" }}>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating" color="duop">
              Ingrese Folio
            </IonLabel>
            <IonInput
              value={Folio}
              color="duop"
              clearInput={true}
              debounce={450}
              onIonChange={(e) => {
                setFolio(e.detail.value!);
              }}
            ></IonInput>
          </IonItem>
        </IonCol>
        <IonCol></IonCol>
        <IonCol>
          <IonItem>
            <IonLabel>Fecha:</IonLabel>
            <IonDatetime
              displayFormat="DD/MM/YYYY"
              value={Fecha}
              color="duop"
              mode="ios"
              onIonChange={(e) => {
                setFecha(e.detail.value!)
              }}
            ></IonDatetime>
          </IonItem>
        </IonCol>
      </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating" color="duop">
                Ingrese maquina
              </IonLabel>
              <IonInput
                value={machineL}
                color="duop"
                clearInput={true}
                debounce={450}
                readonly={true}
                onClick={ ()=>{ machineList() } }
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
        
        {
        position == '2' ? 
        <IonRow>
          <IonCol>
          <IonItem>
              <IonLabel position="floating" color="duop">
                Horometro de Carga
              </IonLabel>
              <IonInput
                value={hnicialComb}
                color="duop"
                type="number"
                readonly={false}
                clearInput={true}
                onIonChange={e => setHiniComb(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        :
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating" color="duop">
                Horometro Inicial
              </IonLabel>
              <IonInput
                value={hnicial}
                color="duop"
                readonly={true}
                onIonChange={e => setHini(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating" color="duop">
                Horometro Final
              </IonLabel>
              <IonInput
                value={hfinal}
                color="duop"
                clearInput={true}
                type="number"
                onIonChange={e => setHFin(numeroloogy(e.detail.value!))}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        }

        <IonRow>
          <IonCol></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
        </IonRow>

        <IonSegment
          value={position}
          onIonChange={(e) => {
            setPos(e.detail.value);
          }}
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
            <IonItem>
              <IonLabel position="floating">
                { position == '2' ? 'Notas de combustible:' : 'Notas:' }
              </IonLabel>
              <IonTextarea
                value={ ( position == '2' ? NotasComb : Notas ) }
                onIonChange={
                  e => 
                    ( position == '2' ? setNotasComb( e.detail.value! ) : setNotas( e.detail.value! ) )
                }
              ></IonTextarea>
            </IonItem>
          </IonCol>
          </IonRow>

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
                disabled = { !enableButton }
                onClick={()=>{handleSubmit()}}
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