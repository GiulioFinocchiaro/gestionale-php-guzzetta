export interface Admin {
  idAdmin: number;
  username: string;
  nome: string;
  cognome: string;
}

export interface Reparto {
  id: number;
  nomeReparto: string;
}

export interface Dipendente {
  id_Dipendente: number;
  Fk_Reparto: number;
  nome: string;
  cognome: string;
  dataNascita?: string;
  codFiscale: string;
  dataAssunzione?: string;
  sesso?: 'M' | 'F' | string;
  comuneNascita?: string;
  stipendioAnnuo?: number;
  pathFoto?: string;
  pathFoto_url?: string;
}

export interface Permesso {
  ID_Permesso: number;
  FK_Dipendente: number;
  dataPermesso: string;
  motivazione: string;
}
