
interface OpenAIConfig {
  apiKey?: string;
}

interface UserProfile {
  skills: string[];
  experience: string;
  targetRole: string;
}

interface AIInsight {
  title: string;
  description: string;
  type: "trend" | "gap" | "recommendation";
}

class OpenAIService {
  private apiKey: string | null = null;
  private configured = false;

  configure(apiKey?: string) {
    if (apiKey) {
      this.apiKey = apiKey;
      this.configured = true;
    }
  }

  isConfigured(): boolean {
    return this.configured && !!this.apiKey;
  }

  // Generate insights based on user profile
  async generateInsights(userProfile: UserProfile): Promise<AIInsight[]> {
    if (!this.isConfigured()) {
      console.warn("OpenAI service not configured with API key");
      return this.generateMockInsights(userProfile);
    }

    try {
      const prompt = `Você é um especialista em desenvolvimento de carreira. Analise o seguinte perfil de usuário e forneça 3 insights acionáveis em JSON:

Habilidades: ${userProfile.skills.join(", ")}
Experiência: ${userProfile.experience}
Cargo Desejado: ${userProfile.targetRole}

Responda com um array JSON com 3 objetos tendo: title (string), description (string), type ("trend" | "gap" | "recommendation")

Responda APENAS com o JSON válido, sem explicações adicionais.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No content in OpenAI response");
      }

      const insights = JSON.parse(content);
      return Array.isArray(insights) ? insights : [insights];
    } catch (error) {
      console.error("Error generating insights with OpenAI:", error);
      return this.generateMockInsights(userProfile);
    }
  }

  // Analyze profile gaps
  async analyzeProfileGaps(
    userProfile: UserProfile,
    marketDemand: string[]
  ): Promise<string[]> {
    if (!this.isConfigured()) {
      return this.generateMockGaps(userProfile, marketDemand);
    }

    try {
      const prompt = `Você é um especialista em habilidades de mercado. Comparando as habilidades do usuário com as demandas do mercado, qual são as 3 habilidades mais importantes que faltam?

Habilidades do usuário: ${userProfile.skills.join(", ")}
Demandas do mercado: ${marketDemand.join(", ")}

Responda com um array JSON de strings com as 3 habilidades faltantes mais importantes.
Responda APENAS com o JSON válido, sem explicações adicionais.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No content in OpenAI response");
      }

      return JSON.parse(content);
    } catch (error) {
      console.error("Error analyzing profile gaps:", error);
      return this.generateMockGaps(userProfile, marketDemand);
    }
  }

  // Generate mock insights when OpenAI is not configured
  private generateMockInsights(userProfile: UserProfile): AIInsight[] {
    return [
      {
        title: "Tendência de Mercado",
        description: `Profissionais com habilidades em ${userProfile.skills[0] || "tecnologia"} estão em alta demanda, com crescimento de 150% nas vagas nos últimos 6 meses.`,
        type: "trend",
      },
      {
        title: "Suas Lacunas de Habilidades",
        description: `Para alcançar o cargo de ${userProfile.targetRole}, você precisaria desenvolver habilidades complementares que aumentariam seu match em 15-20%.`,
        type: "gap",
      },
      {
        title: "Recomendação IA",
        description: `Com base no seu perfil, uma combinação de cursos práticos em ${userProfile.skills[0] || "desenvolvimento"} com suas habilidades atuais pode abrir novas oportunidades.`,
        type: "recommendation",
      },
    ];
  }

  private generateMockGaps(userProfile: UserProfile, marketDemand: string[]): string[] {
    return marketDemand
      .filter((skill) => !userProfile.skills.includes(skill))
      .slice(0, 3);
  }
}

export const openaiService = new OpenAIService();
