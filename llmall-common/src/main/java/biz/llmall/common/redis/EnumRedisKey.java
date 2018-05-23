package biz.llmall.common.redis;

/**
 * @author: liu jun
 * @date: 14:30 2017/11/22
 * @ver: 1.0
 * @desc:
 */
public enum EnumRedisKey {
	REDIS_VALUE_TIMEOUT("1"),
    REDIS_KEY_BRANDS("brands"),
    ;

	private String key;

	EnumRedisKey(String key) {
		this.key = key;
	}

	public String getKeyName(String name) {
		EnumRedisKey[] keys = EnumRedisKey.values();
		for (EnumRedisKey k : keys) {
			if (k.equals(name)) {
				return k.getKeyName(name);
			}
		}

		return "";
	}

	public String getKey() {
		return key;
	}
}
