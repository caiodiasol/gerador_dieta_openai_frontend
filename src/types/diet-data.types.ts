export interface DietData{
    nome: string;
    idade: number;
    altura_cm: number;
    peso_kg: number;
    sexo: "masculino" | "feminino";
    nivel_atividade: "sedentario" | "2X_semana" | "4X_semana";
    objetivo: "perda_de_peso" | "hipertrofia" | "ganhar_musculo" | "manter_massa_muscular";
  }