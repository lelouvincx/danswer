import {
  AnthropicIcon,
  AmazonIcon,
  AWSIcon,
  AzureIcon,
  CPUIcon,
  MicrosoftIconSVG,
  MistralIcon,
  MetaIcon,
  GeminiIcon,
  AnthropicSVG,
  IconProps,
  OpenAIISVG,
  DeepseekIcon,
} from "@/components/icons/icons";

export interface CustomConfigKey {
  name: string;
  description: string | null;
  is_required: boolean;
  is_secret: boolean;
}

export interface WellKnownLLMProviderDescriptor {
  name: string;
  display_name: string;

  deployment_name_required: boolean;
  api_key_required: boolean;
  api_base_required: boolean;
  api_version_required: boolean;

  single_model_supported: boolean;
  custom_config_keys: CustomConfigKey[] | null;
  llm_names: string[];
  default_model: string | null;
  default_fast_model: string | null;
  is_public: boolean;
  groups: number[];
}

export interface LLMProvider {
  name: string;
  provider: string;
  api_key: string | null;
  api_base: string | null;
  api_version: string | null;
  custom_config: { [key: string]: string } | null;
  default_model_name: string;
  fast_default_model_name: string | null;
  is_public: boolean;
  groups: number[];
  display_model_names: string[] | null;
  deployment_name: string | null;
}

export interface FullLLMProvider extends LLMProvider {
  id: number;
  is_default_provider: boolean | null;
  model_names: string[];
  icon?: React.FC<{ size?: number; className?: string }>;
}

export interface LLMProviderDescriptor {
  name: string;
  provider: string;
  model_names: string[];
  default_model_name: string;
  fast_default_model_name: string | null;
  is_default_provider: boolean | null;
  is_public: boolean;
  groups: number[];
  display_model_names: string[] | null;
}

export const getProviderIcon = (providerName: string, modelName?: string) => {
  const modelIconMap: Record<
    string,
    ({ size, className }: IconProps) => JSX.Element
  > = {
    amazon: AmazonIcon,
    phi: MicrosoftIconSVG,
    mistral: MistralIcon,
    ministral: MistralIcon,
    llama: MetaIcon,
    gemini: GeminiIcon,
    deepseek: DeepseekIcon,
    claude: AnthropicIcon,
  };

  const modelNameToIcon = (
    modelName: string,
    fallbackIcon: ({ size, className }: IconProps) => JSX.Element
  ): (({ size, className }: IconProps) => JSX.Element) => {
    const lowerModelName = modelName?.toLowerCase();
    for (const [key, icon] of Object.entries(modelIconMap)) {
      if (lowerModelName?.includes(key)) {
        return icon;
      }
    }
    return fallbackIcon;
  };

  switch (providerName) {
    case "openai":
      // Special cases for openai based on modelName
      return modelNameToIcon(modelName || "", OpenAIISVG);
    case "anthropic":
      return AnthropicSVG;
    case "bedrock":
      return AWSIcon;
    case "azure":
      return AzureIcon;
    default:
      return modelNameToIcon(modelName || "", CPUIcon);
  }
};

export const isAnthropic = (provider: string, modelName: string) =>
  provider === "anthropic" || modelName.toLowerCase().includes("claude");
