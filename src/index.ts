import * as needle from 'needle';

export interface LangConfig {
  token: string;
  apiVersion?: string;
}

export interface Intent {
  name: string;
  features: string[];
}

export interface AnalyzeRequest {
  text: string;
  projectId: string;
}

export interface AnalyzeResponse {
  intents: Intent[];
  score: number;
}

export default class Lang {
  private baseApiUrl: string;
  private apiUrl: string;
  private config: {
    token: string;
  };

  /**
   * Create a new instance of lang class
   * @param config
   * @param config.token
   */
  constructor(config: LangConfig) {
    const apiVersion = config.apiVersion || 'v1';
    this.baseApiUrl = 'https://api.lang.ai';
    this.apiUrl = `${this.baseApiUrl}/${apiVersion}/`;
    this.config = {
      token: config.token,
    };
  }

  public async analyze(params: AnalyzeRequest): Promise<AnalyzeResponse> {
    if (!this.config.token) {
      throw new Error('Token is missing');
    }
    if (!params.projectId) {
      throw new Error('Parameter "projectId" is missing');
    }
    if (!params.text) {
      throw new Error('Parameter "text" is missing');
    }

    const method: string = 'analyze';
    const options = {
      headers: {
        Authorization: `Bearer ${this.config.token}`,
      },
      json: true,
    };

    return new Promise<AnalyzeResponse>(async (resolve, reject) => {
      const endpoint = this.apiUrl + method;

      needle('post', endpoint, params, options)
        .then(res => {
          if (res.statusCode !== 200) {
            return reject(new Error(`Status ${res.statusCode}`));
          }
          resolve(res.body);
        })
        .catch(err => {
          if (err) {
            return reject(err);
          }
        });
    });
  }
}
