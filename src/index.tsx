import React from 'react';
import {createRoot} from 'react-dom/client';
import {ProgramLang, ProgramLangsContainer, ProgramLangName} from './programmingLanguage';
import {LangConfig} from './commentConfig';
import {AppMain} from './app';
import './index.css';


// ======================================================================
type Empty = Record<string, never>

type AppState = {
  lang: ProgramLang,
}

export class App extends React.Component<Empty, AppState> {
  private readonly langsContainer: ProgramLangsContainer = new ProgramLangsContainer();

  constructor(props: Empty) {
    super(props);
    this.state = {
      lang: this.langsContainer.getLangs()[0]
    };
  }

  onLangChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({
      lang: this.langsContainer.name2lang(event.target.value as ProgramLangName)
    });
  };

  render(): React.ReactElement {
    return (
      <>
        <LangConfig
          lang={this.state.lang}
          langsContainer={this.langsContainer}
          isCustomLang={this.state.lang.getName() === 'Custom'}
          onLangChange={this.onLangChange}
        />
        <AppMain lang={this.state.lang}/>
      </>
    );
  }
}


// ======================================================================
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
