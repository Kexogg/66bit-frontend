export enum Gender {
    Male = 'Male',
    Female = 'Female',
}

export const genderToString = {
    [Gender.Male]: 'Мужчина',
    [Gender.Female]: 'Женщина',
}

export enum Position {
    Frontend = 'Frontend',
    Backend = 'Backend',
    Analyst = 'Analyst',
    Manager = 'Manager',
    Designer = 'Designer',
}

export const positionToString = {
    [Position.Frontend]: 'Frontend-разработчик',
    [Position.Backend]: 'Backend-разработчик',
    [Position.Analyst]: 'Аналитик',
    [Position.Manager]: 'Менеджер',
    [Position.Designer]: 'Дизайнер',
}

export enum Technology {
    CSharp = 'CSharp',
    React = 'React',
    Java = 'Java',
    PHP = 'PHP',
    Figma = 'Figma',
    Word = 'Word',
}

export const technologyToString = {
    [Technology.CSharp]: 'C#',
    [Technology.React]: 'React',
    [Technology.Java]: 'Java',
    [Technology.PHP]: 'PHP',
    [Technology.Figma]: 'Figma',
    [Technology.Word]: 'Word',
}
